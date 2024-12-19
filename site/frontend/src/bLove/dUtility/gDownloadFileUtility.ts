const downloadFileUtility = (event: React.MouseEvent<HTMLAnchorElement>, fileUploaded: string) => {
  event.preventDefault(); // Prevent default anchor behavior

  if (!fileUploaded) {
    console.error("File path is not provided");
    return;
  }

  const parts = fileUploaded.split("/");
  const fileName = parts[parts.length - 1] || "downloaded-file";

  fetch(event.currentTarget.href, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove(); // Cleanup the link element
      window.URL.revokeObjectURL(url); // Release the object URL
    })
    .catch((err) => {
      console.error("Download failed", err);
    });
};

export default downloadFileUtility;
