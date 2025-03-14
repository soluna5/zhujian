export type BeadConfig = {
  type: "destiny" | "function" | "correction"
  shape: "round" | "special" | "spacer"
  color: string
  imageUrl: string
}

export const beadConfigurations: Record<string, BeadConfig> = {
  destiny: {
    type: "destiny",
    shape: "round",
    color: "#FFC0CB",
    // 使用 512x512 像素的 PNG 图片，透明背景
    imageUrl: "/images/destiny-bead-rose-quartz.png",
  },
  function: {
    type: "function",
    shape: "round",
    color: "#9370DB",
    // 使用 1024x1024 像素的 PNG 图片，确保纹理可以无缝平铺
    imageUrl: "/images/function-bead-amethyst.png",
  },
  correction: {
    type: "correction",
    shape: "round",
    color: "#FFFFFF",
    // 使用 JPEG 格式，文件大小控制在 500KB 以下
    imageUrl: "/images/correction-bead-clear-quartz.jpg",
  },
}

