"use client";

export function Checklist({
  itens,
  marcados,
  onToggle,
}: {
  itens: string[];
  marcados: Record<string, boolean>;
  onToggle: (indice: number, valor: boolean) => void;
}) {
  return (
    <ul className="my-4 space-y-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
      {itens.map((item, i) => {
        const checked = !!marcados[String(i)];
        return (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-3 text-[15px] text-neutral-200">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onToggle(i, e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-emerald-500"
              />
              <span className={checked ? "text-neutral-500 line-through" : ""}>{item}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
