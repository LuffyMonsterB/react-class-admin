export default function download2Excel(blob: Buffer, name: string) {
  const url = window.URL.createObjectURL(
    new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
  );
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', `${name}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
