export default function PolitikaPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <article className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-4 text-text-muted">Последнее обновление: март 2026</p>

        <div className="prose prose-primary mt-12 max-w-3xl space-y-6 text-primary">
          <section>
            <h2 className="font-heading text-xl font-semibold">1. Общие положения</h2>
            <p>
              Настоящая политика конфиденциальности определяет порядок обработки и защиты
              персональных данных пользователей сайта UHome.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">2. Сбор данных</h2>
            <p>
              Мы собираем информацию, которую вы добровольно предоставляете при заполнении форм
              на сайте: имя, номер телефона, адрес электронной почты.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">3. Использование данных</h2>
            <p>
              Персональные данные используются исключительно для связи с вами по запросу,
              предоставления информации об услугах и расчёта стоимости работ.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">4. Защита данных</h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для защиты
              персональных данных от несанкционированного доступа, изменения или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">5. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:
              info@uhome.by
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
