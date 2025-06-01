"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IPlant } from '@/lib/models/Plant';

interface RelatedPlantsProps {
  currentPlantId: string;
  relatedPlantsData: IPlant[];
}

export default function RelatedPlants({
  currentPlantId,
  relatedPlantsData,
}: RelatedPlantsProps) {
  // If relatedPlantsData is already populated, use it directly
  // Otherwise, we could fetch from API, but since it's already populated, we use the data

  if (!relatedPlantsData || relatedPlantsData.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tanaman Terkait</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedPlantsData.map((plant) => (
          <Link key={plant._id as string} href={`/tanaman/${plant.slug}`}>
            <div className="card h-full hover:translate-y-[-5px] transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={plant.image || 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=No+Image'}
                  alt={plant.name}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=Img+Error';
                  }}
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {plant.name}
                </h3>
                <p className="text-sm italic text-gray-500 mb-2">
                  {plant.latinName}
                </p>
                
                {/* Show first 2 benefits */}
                <div className="mb-3">
                  {plant.benefits && plant.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {plant.benefits.slice(0, 2).map((benefit, index) => (
                        <span key={index} className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                          {benefit}
                        </span>
                      ))}
                      {plant.benefits.length > 2 && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                          +{plant.benefits.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="h-4 w-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Asal: {plant.region}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}