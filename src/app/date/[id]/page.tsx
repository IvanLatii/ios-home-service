import { notFound } from "next/navigation";
import { DateScreen } from "@/components/service/date-screen";
import { getService } from "@/lib/services-data";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ option?: string }>;
}

export default async function DatePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { option: optionId } = await searchParams;

  const service = getService(id);
  if (!service) notFound();

  const option =
    service.options.find((o) => o.id === optionId) ?? service.options[0];
  if (!option) notFound();

  return (
    <DateScreen serviceId={id} optionId={option.id} rawId={id} />
  );
}
