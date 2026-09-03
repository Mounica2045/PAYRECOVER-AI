import React from 'react';
import Breadcrumbs from '../navigation/Breadcrumbs';

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  actions
}) {
  return (
    <div className="space-y-2 mb-6">
      {breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {title && (
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
