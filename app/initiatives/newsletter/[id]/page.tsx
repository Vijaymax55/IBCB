import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { newsletters } from "@/data/newsletters";
import { NewsletterReader } from "@/components/sections/newsletter/NewsletterReader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return newsletters.map((n) => ({ id: String(n.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const newsletter = newsletters.find((n) => String(n.id) === id);
  if (!newsletter) return { title: "Newsletter Not Found" };
  return {
    title: newsletter.title,
    description: `Read ${newsletter.title} — MCLF Newsletter, ${newsletter.month} ${newsletter.year}`,
  };
}

export default async function NewsletterReaderPage({ params }: PageProps) {
  const { id } = await params;
  const newsletter = newsletters.find((n) => String(n.id) === id);
  if (!newsletter) notFound();

  return <NewsletterReader newsletter={newsletter} />;
}
