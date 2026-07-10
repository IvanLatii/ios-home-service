import { notFound } from "next/navigation";

import { ServiceDetailsScreen } from "@/components/service/service-details-screen";
import { getService } from "@/lib/services-data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = getService(id);

  if (!service) notFound();

  return <ServiceDetailsScreen service={service} rawId={id} />;
}
