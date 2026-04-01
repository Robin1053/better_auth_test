import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';


const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "HttpError";
        this.status = status;
    }
}

function validateFile(file: File | null): asserts file is File {
    if (!file) {
        throw new HttpError("No file uploaded", 400)
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new HttpError("Unsupported file type. Allowed types: JPEG, PNG, WEBP.", 415)
    }

    if (file.size > MAX_SIZE) {
        throw new HttpError("File is too large. Max 5MB", 413)
    }
}

function toErrorResponse(err: unknown) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status });
}

function getExtensionFromMimeType(mimeType: string) {
    if (mimeType === 'image/png') return 'png';
    if (mimeType === 'image/webp') return 'webp';
    return 'jpg';
}

async function saveImageLocally(userId: string, file: File) {
    const extension = getExtensionFromMimeType(file.type);
    const fileName = `${userId}-${Date.now()}-${randomUUID()}.${extension}`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const absoluteFilePath = path.join(uploadsDir, fileName);

    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(absoluteFilePath, buffer);

    return `/uploads/${fileName}`;
}



// Intial Upload of profile picture
export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contentType = request.headers.get("content-type") ?? "";
        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { error: "Expected multipart/form-data" },
                { status: 400 }
            );
        }
        const formData = await request.formData();
        const raw = formData.get("file");
        const file = raw instanceof File ? raw : null;
        validateFile(file);

        const imageUrl = await saveImageLocally(session.user.id, file);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { image: imageUrl },
        });

        return NextResponse.json({ ok: true, imageUrl }, { status: 201 });

    } catch (err) {
        return toErrorResponse(err)
    }
}

// Update profile picture
export async function PUT(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contentType = request.headers.get("content-type") ?? "";
        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { error: "Expected multipart/form-data" },
                { status: 400 }
            );
        }
        const formData = await request.formData();
        const raw = formData.get("file");
        const file = raw instanceof File ? raw : null;
        validateFile(file);

        const imageUrl = await saveImageLocally(session.user.id, file);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { image: imageUrl },
        });

        return NextResponse.json({ ok: true, imageUrl }, { status: 200 });
    } catch (err) {
        return toErrorResponse(err)
    }
}