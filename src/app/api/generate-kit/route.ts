import { NextRequest, NextResponse } from "next/server";

// Helper to fetch Figma styles
async function fetchFigmaStyles(figmaToken: string, fileId: string) {
  const res = await fetch(`https://api.figma.com/v1/files/${fileId}/styles`, {
    headers: { Authorization: `Bearer ${figmaToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch Figma styles");
  const data = await res.json();
  return data.styles;
}

// Map Figma styles to a basic Elementor kit format
function mapToElementorKit(styles: unknown) {
  // This is a minimal example. Elementor kits are more complex, but this gives you a starting point.
  const styleArr = Object.values(styles as Record<string, unknown>);
  const colors = styleArr.filter((s: any) => s.style_type === "FILL");
  const text = styleArr.filter((s: any) => s.style_type === "TEXT");
  return {
    elementorKit: {
      colors: colors.map((c: any) => ({ name: c.name, key: c.node_id })),
      typography: text.map((t: any) => ({ name: t.name, key: t.node_id })),
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const { figmaToken, fileId } = await req.json();
    if (!figmaToken || !fileId) {
      return NextResponse.json({ error: "Missing Figma token or file ID" }, { status: 400 });
    }
    const styles = await fetchFigmaStyles(figmaToken, fileId);
    // For a real kit, you'd fetch node details and map to Elementor's expected format
    const kit = mapToElementorKit(styles);
    const kitJson = JSON.stringify(kit, null, 2);
    return new NextResponse(kitJson, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=elementor-kit.json",
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
} 