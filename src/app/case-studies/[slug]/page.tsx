import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudy } from '../data';
import CaseStudyClient from './client';

export function generateStaticParams() {
  return CASE_STUDIES.filter(cs => !cs.comingSoon).map(cs => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  return <CaseStudyClient slug={slug} />;
}
