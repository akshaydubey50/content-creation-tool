// export const metadata = {
//   title: "Content Creation Tools",
//   description:
//     "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
// };

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      {children}
    </div>
  );
}
