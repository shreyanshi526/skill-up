// TimelineWrapper.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";

const Timeline = dynamic(() => import('../ui/timeline'), {
  ssr: false,
  loading: () => <div>Loading timeline...</div>,
});

export default Timeline;
