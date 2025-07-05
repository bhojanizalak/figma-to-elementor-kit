import { NextRequest, NextResponse } from "next/server";

// Helper to fetch Figma styles
async function fetchFigmaStyles(figmaToken: string, fileId: string) {
  const res = await fetch(`https://api.figma.com/v1/files/${fileId}/styles`, {
    headers: { Authorization: `Bearer ${figmaToken}` },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Figma API error response:", errorText);
    throw new Error("Failed to fetch Figma styles: " + errorText);
  }
  const data = await res.json();
  return data.styles;
}

// Map Figma styles to a basic Elementor kit format
function mapToElementorKit(styles: unknown) {
  const styleArr = Object.values(styles as Record<string, unknown>);
  const colors = styleArr.filter((s) => (s as { style_type?: string }).style_type === "FILL");
  const text = styleArr.filter((s) => (s as { style_type?: string }).style_type === "TEXT");
  return {
    elementorKit: {
      colors: colors.map((c) => ({ name: (c as { name?: string }).name, key: (c as { node_id?: string }).node_id })),
      typography: text.map((t) => ({ name: (t as { name?: string }).name, key: (t as { node_id?: string }).node_id })),
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
    console.error("API Error in /api/generate-kit:", err);
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
} 