/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
import { getCategoryData } from "./page";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Expolorer | Blog";
export const contentType = "image/png";

export default async function og({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const categoryData = await getCategoryData(slug);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1 object-cover w-full h-full object-center"
            src=""
            alt="Explorer"
          />
          {/* Overlay */}
          <div
            tw={`absolute flex inset-0 bg-opacity-80 ${
              categoryData?.title === "Cities" ||
              categoryData?.title === "Städte"
                ? "bg-emerald-600"
                : "bg-indigo-600"
            }`}
          />
        </div>
        <div tw="flex flex-col text-white">
          {/* Title */}
          <div tw="text-7xl font-bold">{categoryData?.title}</div>
          {/* Tags */}
          {/* Description */}
          <div tw="text-3xl max-w-4xl">{categoryData?.description}</div>
        </div>
      </div>
    ),
    size
  );
}
