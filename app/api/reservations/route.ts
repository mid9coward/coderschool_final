import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  // Fetch the listing to check if the current user is the owner
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { userId: true },
  });

  if (!listing) {
    return NextResponse.error();
  }

  // Prevent owner from reserving their own listing
  if (listing.userId === currentUser.id) {
    return NextResponse.json(
      { error: "Owners cannot reserve their own listing." },
      { status: 403 }
    );
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
