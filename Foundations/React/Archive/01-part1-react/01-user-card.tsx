// Challenge 1: UserCard with props
// Save as: app/components/UserCard.tsx

type UserCardProps = {
  name: string;
  role: string;
};

export function UserCard({ name, role }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
