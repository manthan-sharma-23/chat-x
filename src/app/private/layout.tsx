

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-screen bg-black">{children}</div>;
}
