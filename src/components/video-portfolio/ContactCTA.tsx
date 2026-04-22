import { useTranslation } from 'react-i18next';
import links from '../../constants/links.json';

export default function ContactCTA() {
    const { t } = useTranslation();

    return (
        <section id="contact" className="relative px-12 py-24 rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 backdrop-blur-3xl z-0" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                    {t('videoPortfolio.cta.title') || "Ready to"}<br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-focus/30">{t('videoPortfolio.cta.titleHighlight') || "Amplify Your Story?"}</span>
                </h2>

                <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
                    <a
                        href={`${links.contact.mailPrimary}?subject=${encodeURIComponent(t('videoPortfolio.cta.emailSubject'))}&body=${encodeURIComponent(t('videoPortfolio.cta.emailBody'))}`}
                        className="px-10 py-5 rounded-full bg-primary text-primary-content font-black hover:bg-primary-focus transition-all active:scale-95 shadow-xl inline-block"
                    >
                        {t('videoPortfolio.cta.primary') || "Initiate Collaboration"}
                    </a>
                </div>

                <div className="flex justify-center gap-8 text-base-content/30 text-[10px] font-black tracking-[0.2em] uppercase">
                    <a href={links.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-base-content cursor-pointer transition-colors">{t('videoPortfolio.gallery.social.instagram')}</a>
                    <a href={links.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-base-content cursor-pointer transition-colors">{t('videoPortfolio.gallery.social.linkedin')}</a>
                    <a href={links.socials.behance} target="_blank" rel="noopener noreferrer" className="hover:text-base-content cursor-pointer transition-colors">{t('videoPortfolio.gallery.social.behance')}</a>
                </div>
            </div>
        </section>
    );
}
