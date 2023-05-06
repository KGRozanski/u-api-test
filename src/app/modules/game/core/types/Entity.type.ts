export type EntityImport = typeof import('../classes/entities/buildings/_index').default;
export type EntityClassName = keyof EntityImport;
