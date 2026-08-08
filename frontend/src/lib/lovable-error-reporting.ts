export function reportLovableError(error: Error, meta?: Record<string, any>){
  // Placeholder for error reporting integration. In production, wire to Sentry/Logrocket/etc.
  console.warn('reportLovableError called', error.message, meta || {});
}
