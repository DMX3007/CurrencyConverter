type PropArrow = {
  color: string;
}

const ArrowSvg = ({ color }: PropArrow) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={24}
    fill="none"
  // {...props}
  >
    <path d="M.8 6a6 6 0 0 1 6-6h32.4a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6.8a6 6 0 0 1-6-6V6Z" />
    <path
      fill={color}
      d="m23.204 17.121-8.59-8.707L16.008 7l7.195 7.293L30.4 7l1.395 1.414-8.59 8.707Z"
    />
  </svg>
)
export default ArrowSvg
