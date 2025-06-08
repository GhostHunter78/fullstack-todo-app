export default function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <label className="block w-full text-sm mb-1">{label}</label>
      {children}
    </div>
  );
}
