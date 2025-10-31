import "./globals.css";

export const metadata = {
  title: "CommanderForge.ai",
  description: "AI-powered Commander synergies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-white">{children}</body>
    </html>
  );
}
