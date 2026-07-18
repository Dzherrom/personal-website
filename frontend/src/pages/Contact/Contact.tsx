import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { sendContactMessage } from "../../services/api";
import styles from "./Contact.module.scss";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={styles.section}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Contacto
      </motion.h2>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Nombre</label>
          <input className={styles.input} id="name" name="name" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} id="email" name="email" type="email" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="subject">Asunto</label>
          <input className={styles.input} id="subject" name="subject" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="message">Mensaje</label>
          <textarea className={styles.textarea} id="message" name="message" required />
        </div>
        <button className={styles.submit} type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
        </button>
      </motion.form>

      {status === "success" && (
        <p className={styles.success}>¡Mensaje enviado correctamente!</p>
      )}
      {status === "error" && (
        <p className={styles.error}>Error al enviar. Intenta de nuevo.</p>
      )}
    </section>
  );
}
