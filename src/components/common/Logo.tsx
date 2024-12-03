function Logo({ fontSize = "text-5xl" }: { fontSize?: string }) {
  return <p className={`${fontSize} font-semibold text-main`}>Qaddemly</p>;
}

export default Logo;
