import { ScrollInText } from "./ScrollInText"

export default function ExampleUsage() {
  return (
    <main style={{ minHeight: "200vh", padding: "20vh 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ height: "60vh" }} />
        <ScrollInText
          text="Dieser Text blendet beim Reinscrollen von grün auf schwarz ein."
          className="text-4xl font-semibold"
        />
      </div>
    </main>
  )
}
