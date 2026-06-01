export const MAX_AVATAR_BYTES = 6 * 1024 * 1024;

export function cropImageToSquareDataUrl(file: File, size: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("O arquivo selecionado nao e uma imagem."));
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      reject(new Error("A imagem e muito grande. Escolha um arquivo de ate 6 MB."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Nao foi possivel ler o arquivo."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
      image.onload = () => {
        const side = Math.min(image.width, image.height);
        const sourceX = (image.width - side) / 2;
        const sourceY = (image.height - side) / 2;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Recurso de imagem indisponivel neste navegador."));
          return;
        }

        context.imageSmoothingQuality = "high";
        context.drawImage(image, sourceX, sourceY, side, side, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
