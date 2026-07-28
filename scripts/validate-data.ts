import { categories, services } from "../src/data";

const errors: string[] = [];

// Рівно 8 категорій
if (categories.length !== 8) {
  errors.push(`Expected exactly 8 categories, found ${categories.length}`);
}

// Рівно 64 послуги
if (services.length !== 64) {
  errors.push(`Expected exactly 64 services, found ${services.length}`);
}

const categoryIds = new Set(categories.map((c) => c.id));
const serviceIds = new Set(services.map((s) => s.id));

// Дублікати id/slug категорій
{
  const ids = categories.map((c) => c.id);
  const slugs = categories.map((c) => c.slug);
  ids
    .filter((id, i) => ids.indexOf(id) !== i)
    .forEach((id) => errors.push(`Duplicate category id: "${id}"`));
  slugs
    .filter((slug, i) => slugs.indexOf(slug) !== i)
    .forEach((slug) => errors.push(`Duplicate category slug: "${slug}"`));
}

// Дублікати id/slug послуг
{
  const ids = services.map((s) => s.id);
  const slugs = services.map((s) => s.slug);
  ids
    .filter((id, i) => ids.indexOf(id) !== i)
    .forEach((id) => errors.push(`Duplicate service id: "${id}"`));
  slugs
    .filter((slug, i) => slugs.indexOf(slug) !== i)
    .forEach((slug) => errors.push(`Duplicate service slug: "${slug}"`));
}

// Кожна послуга: непорожні title/slug/categoryId, basePrice > 0, поля коректні
for (const service of services) {
  const label = service.id || "(no id)";

  if (!service.title || !service.title.trim()) {
    errors.push(`Service "${label}": empty title`);
  }
  if (!service.slug || !service.slug.trim()) {
    errors.push(`Service "${label}": empty slug`);
  }
  if (!service.categoryId || !service.categoryId.trim()) {
    errors.push(`Service "${label}": empty categoryId`);
  }
  if (!(service.basePrice > 0)) {
    errors.push(`Service "${label}": basePrice must be greater than zero, got ${service.basePrice}`);
  }
  if (service.categoryId && !categoryIds.has(service.categoryId)) {
    errors.push(`Service "${label}": categoryId "${service.categoryId}" does not exist among categories`);
  }

  if (!service.fields || service.fields.length === 0) {
    errors.push(`Service "${label}": must have at least one field`);
  } else {
    for (const field of service.fields) {
      if (!field.options || field.options.length < 2) {
        errors.push(
          `Service "${label}", field "${field.id || field.label}": must have at least two options, got ${field.options?.length ?? 0}`
        );
      }
    }
  }
}

// Кожен serviceId у категорії існує серед послуг
for (const category of categories) {
  for (const serviceId of category.serviceIds) {
    if (!serviceIds.has(serviceId)) {
      errors.push(`Category "${category.id}": serviceId "${serviceId}" does not exist among services`);
    }
  }
}

// Звіт
if (errors.length === 0) {
  console.log(`OK: ${categories.length} categories, ${services.length} services — all checks passed.`);
  process.exit(0);
} else {
  console.log(`FAILED: ${errors.length} issue(s) found:\n`);
  for (const error of errors) {
    console.log(`  - ${error}`);
  }
  process.exit(1);
}
