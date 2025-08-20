'use client'
import React from "react";
import Button from "../common/Button";
import { Plus } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  content?: string;
  onCreateClick?: () => void;
  asChild?: boolean;
  href?: string;
};

const ManagementHeader = ({
  title,
  content,
  onCreateClick,
  asChild,
  href,
}: Props) => {
  return (
    <header className="grow mb-8 capitalize gap-4 flex justify-between items-center ">
      <h1>{title}</h1>
      {content && (
        <Button asChild={asChild} onClick={onCreateClick}>
          {asChild && href ? (
            <Link href={href}>
              <Plus />
              new {content}
            </Link>
          ) : (
            <>
              <Plus />
              new {content}
            </>
          )}
        </Button>
      )}
    </header>
  );
};

export default ManagementHeader;
