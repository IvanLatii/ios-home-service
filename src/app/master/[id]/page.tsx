import { notFound } from "next/navigation";
import { MasterScreen } from "@/components/service/master-screen";
import { getService } from "@/lib/services-data";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    option?: string;
    date?: string;
    time?: string;
  }>;
}

export default async function MasterPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { option: optionId, date = "", time = "" } = await searchParams;

  const service = getService(id);
  if (!service) notFound();

  const option =
    service.options.find((o) => o.id === optionId) ?? service.options[0];
  if (!option) notFound();

  return (
    <MasterScreen
      serviceTitle={service.title}
      optionLabel={option.label}
      serviceId={id}
      rawId={id}
      optionId={option.id}
      date={date}
      time={decodeURIComponent(time)}
    />
  );
}
