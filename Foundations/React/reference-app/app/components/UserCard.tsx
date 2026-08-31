// Part 1 challenge: UserCard with props
type UserCardProps = {
  name: string;
  role: string;
};

export function UserCard({ name, role }: UserCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
