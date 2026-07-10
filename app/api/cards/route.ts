import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Card from "@/lib/models/Card";

export async function GET() {
  try {
    await dbConnect();
    const cards = await Card.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, cards });
  } catch (error: any) {
    console.error("Error in GET /api/cards:", error);
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cardData = await request.json();

    if (!cardData.id || !cardData.title || !cardData.category || !cardData.price || !cardData.colorName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Check if card with same id already exists
    const existing = await Card.findOne({ id: cardData.id });
    if (existing) {
      // Update it
      Object.assign(existing, cardData);
      await existing.save();
      return NextResponse.json({ success: true, card: existing });
    }

    const newCard = new Card(cardData);
    await newCard.save();

    return NextResponse.json({ success: true, card: newCard });
  } catch (error: any) {
    console.error("Error in POST /api/cards:", error);
    return NextResponse.json({ error: "Failed to save card" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    await dbConnect();
    const result = await Card.findOneAndDelete({ id });

    if (!result) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Card deleted successfully" });
  } catch (error: any) {
    console.error("Error in DELETE /api/cards:", error);
    return NextResponse.json({ error: "Failed to delete card" }, { status: 500 });
  }
}

