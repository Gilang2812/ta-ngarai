import TrackingPage from "@/components/web/tracking/TrackingPage";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

export default async function Tracking({ params }: DynamicPageProps) {
  const { id } = await params;
  return <TrackingPage id={id} />;
}
