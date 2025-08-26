import TrackingPage from "@/components/web/tracking/TrackingPage";
import { DynamicPageProps } from "@/type/props/DynamicPageProps";
import React from "react";

export default async function Tracking({ params }: DynamicPageProps) {
  const { id } = await params;
  return <TrackingPage id={id} />;
}
