import Image from "next/image"

export default function Input() {
  return (
    <>
      <h2 className="sub-title">Онлайн конвертация валют</h2>
      <section className="card-section">
        <article className="card"></article>
        <button className="card-section__converter-button">
          <Image
            className="card-section__img"
            src="./public/converter.svg"
            alt="конвертация"
            width={32}
            height={32}
          />
        </button>
        <article className="card"></article>
      </section>
    </>
  )
}
