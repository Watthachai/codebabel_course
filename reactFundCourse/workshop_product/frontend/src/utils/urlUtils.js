export const paths = {
  products: '/products',
  cart: '/cart',
  // เพิ่ม path อื่นๆ ตามต้องการ
};

export function buildUrl(basePath, ...segments) {
  return `${basePath}/${segments.join('/')}`;
}