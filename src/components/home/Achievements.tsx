import { useTranslation } from 'react-i18next';

export default function Achievements() {
    const { t } = useTranslation();

    const stats = [
        { label: t('home.achievements.projects'), value: '12+' },
        { label: t('home.achievements.views'), value: '5M+' },
        { label: t('home.achievements.awards'), value: '72H' },
    ];

    return (
        <section className="py-0 h-full col-span-5 flex flex-col">
            <div className="h-full flex flex-col justify-center bg-[#13131a] rounded-[3rem] p-10 md:p-12 border border-white/5">
                <div className="flex flex-col gap-10">
                    <h3 className="text-white/40 text-xs font-black tracking-[0.3em] uppercase">
                        {t('home.achievements.title')}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <span className="text-6xl font-black text-t4zor-orange tracking-tighter">
                                    {stat.value}
                                </span>
                                <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
