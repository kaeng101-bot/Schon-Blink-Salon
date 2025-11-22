
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { BookingSystem } from './components/Diagrams';
import { Menu, X, Star, MapPin, Phone, Instagram, Facebook, Scissors, Globe } from 'lucide-react';

type Language = 'th' | 'en' | 'cn';

const content = {
  en: {
    nav: { services: "Services", about: "About", reviews: "Reviews", book: "Book Now" },
    hero: {
      badge: "Beauty & Elegance",
      title: "Reveal Your",
      subtitle: "True Radiance",
      desc: "Experience premium hair care and styling in a relaxing atmosphere. Your beauty is our masterpiece.",
      btn_book: "Book Appointment",
      btn_services: "View Services"
    },
    services: {
      title: "Our Services",
      desc: "We offer a wide range of professional hair and beauty treatments designed to help you look and feel your absolute best.",
      items: [
         { title: "Haircut & Styling", price: "Starts at ฿500", desc: "Precision cuts tailored to your face shape and lifestyle, finished with a professional blowout." },
         { title: "Creative Color", price: "Starts at ฿2,500", desc: "From subtle balayage to vibrant transformations, using premium products that protect your hair." },
         { title: "Treatments & Spa", price: "Starts at ฿1,200", desc: "Revitalize damaged hair and relax your scalp with our luxurious deep conditioning rituals." }
      ]
    },
    book: {
      title: "Book Your Visit",
      desc: "Ready for a transformation? Select your preferred service and time slot. We'll confirm your appointment instantly.",
      location: "Location",
      contact: "Contact",
      address: "88/1-2 Chonburi-Ban Bueng Rd, Ban Bueng, Chon Buri 20170",
      phone: "064-079-6464"
    },
    reviews: { 
        title: "Client Love",
        items: [
            { name: "Sarah J.", text: "The best salon experience I've ever had. The staff is incredibly attentive and my hair has never looked better!" },
            { name: "Emily R.", text: "I love the atmosphere at Schon Blink. It's so relaxing, and the colorists are true artists." },
            { name: "Michael T.", text: "Great service and professional cut. Easy booking system too!" }
        ]
    },
    footer: {
      about: "We believe that everyone deserves to look and feel beautiful. Our team of expert stylists is dedicated to providing you with personalized care and exceptional results.",
      hours_title: "Hours",
      hours: [
        "Thu - Tue: 8:00 - 19:30",
        "Wednesday: Closed",
        "Public Holidays: Open"
      ],
      menu_title: "Menu",
      rights: "© 2024 Schon Blink Salon. All rights reserved."
    }
  },
  th: {
    nav: { services: "บริการ", about: "เกี่ยวกับเรา", reviews: "รีวิว", book: "จองคิว" },
    hero: {
      badge: "ความงามและความสง่างาม",
      title: "เผยความงาม",
      subtitle: "ในแบบที่เป็นคุณ",
      desc: "สัมผัสประสบการณ์การดูแลเส้นผมระดับพรีเมียมในบรรยากาศที่ผ่อนคลาย ความงามของคุณคือผลงานชิ้นเอกของเรา",
      btn_book: "จองคิวทันที",
      btn_services: "ดูบริการของเรา"
    },
    services: {
      title: "บริการของเรา",
      desc: "เรามีบริการดูแลเส้นผมและความงามหลากหลายรูปแบบ เพื่อให้คุณดูดีและรู้สึกมั่นใจที่สุด",
      items: [
         { title: "ตัดผมและจัดทรง", price: "เริ่มต้น ฿500", desc: "ตัดผมตามรูปหน้าและไลฟ์สไตล์ของคุณ พร้อมเซ็ตทรงโดยมืออาชีพ" },
         { title: "ทำสีผม", price: "เริ่มต้น ฿2,500", desc: "ตั้งแต่บาลายาจธรรมชาติไปจนถึงสีสันสดใส ด้วยผลิตภัณฑ์พรีเมียมที่ถนอมเส้นผม" },
         { title: "ทรีทเมนท์และสปา", price: "เริ่มต้น ฿1,200", desc: "ฟื้นฟูผมเสียและผ่อนคลายหนังศีรษะด้วยทรีทเมนท์บำรุงล้ำลึก" }
      ]
    },
    book: {
      title: "จองคิวใช้บริการ",
      desc: "พร้อมสำหรับการเปลี่ยนแปลงหรือยัง? เลือกบริการและเวลาที่คุณต้องการ เราจะยืนยันการนัดหมายของคุณทันที",
      location: "สถานที่ตั้ง",
      contact: "ติดต่อ",
      address: "88/1-2 ถ.ชลบุรี-บ้านบึง ต.บ้านบึง อ.บ้านบึง จ.ชลบุรี 20170",
      phone: "064-079-6464"
    },
    reviews: { 
        title: "ความประทับใจจากลูกค้า",
        items: [
            { name: "สาริศา จ.", text: "ประสบการณ์ที่ดีที่สุดที่เคยได้รับ พนักงานใส่ใจมากและผมออกมาสวยมากค่ะ!" },
            { name: "เอมิกา ร.", text: "ชอบบรรยากาศที่นี่มาก ผ่อนคลายสุดๆ ช่างทำสีเก่งมากค่ะ" },
            { name: "ไมเคิล ที.", text: "บริการดีเยี่ยม ตัดผมสวย ระบบจองง่ายมากครับ" }
        ]
    },
    footer: {
      about: "เราเชื่อว่าทุกคนสมควรดูดีและรู้สึกสวยงาม ทีมช่างผู้เชี่ยวชาญของเรามุ่งมั่นที่จะให้บริการดูแลเอาใจใส่เป็นพิเศษเพื่อผลลัพธ์ที่ยอดเยี่ยม",
      hours_title: "เวลาทำการ",
      hours: [
        "พฤหัสบดี - อังคาร: 8:00 - 19:30 น.",
        "วันพุธ: ปิดให้บริการ",
        "วันนักขัตฤกษ์: เปิดให้บริการปกติ"
      ],
      menu_title: "เมนู",
      rights: "© 2024 Schon Blink Salon. สงวนลิขสิทธิ์."
    }
  },
  cn: {
    nav: { services: "服务", about: "关于我们", reviews: "评价", book: "立即预订" },
    hero: {
      badge: "美丽与优雅",
      title: "展现您的",
      subtitle: "真实光彩",
      desc: "在轻松的氛围中体验优质的护发和造型服务。您的美丽是我们的杰作。",
      btn_book: "预约",
      btn_services: "查看服务"
    },
    services: {
      title: "我们的服务",
      desc: "我们提供广泛的专业美发和美容护理，旨在帮助您展现最佳状态。",
      items: [
         { title: "剪发与造型", price: "起价 ฿500", desc: "根据您的脸型和生活方式量身定制的精准剪发，并配以专业的吹风造型。" },
         { title: "创意染发", price: "起价 ฿2,500", desc: "从微妙的挑染到鲜艳的色彩转变，使用保护头发的优质产品。" },
         { title: "护理与水疗", price: "起价 ฿1,200", desc: "通过我们奢华的深层护理仪式，修复受损发质并放松头皮。" }
      ]
    },
    book: {
      title: "预约您的访问",
      desc: "准备好改变了吗？选择您喜欢的服务和时间段。我们将立即确认您的预约。",
      location: "地址",
      contact: "联系方式",
      address: "88/1-2 Chonburi-Ban Bueng Rd, Ban Bueng, Chon Buri 20170",
      phone: "064-079-6464"
    },
    reviews: { 
        title: "客户评价",
        items: [
            { name: "Sarah J.", text: "我有过的最好的沙龙体验。员工非常细心，我的头发看起来从未如此好过！" },
            { name: "Emily R.", text: "我喜欢这里的氛围。非常放松，染发师真的是艺术家。" },
            { name: "Michael T.", text: "优质的服务和专业的剪发。预订系统也很方便！" }
        ]
    },
    footer: {
      about: "我们相信每个人都值得拥有美丽。我们的专家造型师团队致力于为您提供个性化的护理和卓越的效果。",
      hours_title: "营业时间",
      hours: [
        "周四 - 周二: 8:00 - 19:30",
        "周三: 休息",
        "公共假期: 正常营业"
      ],
      menu_title: "菜单",
      rights: "© 2024 Schon Blink Salon. 保留所有权利。"
    }
  }
};

const ServiceHighlight = ({ title, price, desc }: { title: string, price: string, desc: string }) => (
  <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="w-10 h-10 bg-nobel-rose/20 rounded-full flex items-center justify-center text-stone-700 mb-4 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
          <Scissors size={18} />
      </div>
      <h3 className="font-serif text-xl text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-500 text-sm mb-4 leading-relaxed">{desc}</p>
      <p className="font-medium text-nobel-gold">{price}</p>
  </div>
);

const ReviewCard = ({ name, text }: { name: string, text: string }) => (
    <div className="bg-[#F9F8F4] p-6 rounded-xl border border-stone-200">
        <div className="flex gap-1 text-nobel-gold mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
        </div>
        <p className="text-stone-600 italic text-sm mb-4">"{text}"</p>
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">— {name}</p>
    </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('th');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#FDFAF5] text-stone-800 selection:bg-nobel-rose selection:text-stone-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className={`font-serif font-bold text-2xl tracking-wide text-stone-900`}>
              SCHON BLINK <span className="text-nobel-gold text-sm font-sans font-normal tracking-[0.2em] uppercase block -mt-1">Salon</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
             <div className="flex items-center gap-2 mr-4 text-xs font-bold border-r border-stone-300 pr-6">
                <button onClick={() => setLang('th')} className={`hover:text-nobel-gold transition-colors ${lang === 'th' ? 'text-nobel-gold' : 'text-stone-400'}`}>TH</button>
                <span className="text-stone-300">|</span>
                <button onClick={() => setLang('en')} className={`hover:text-nobel-gold transition-colors ${lang === 'en' ? 'text-nobel-gold' : 'text-stone-400'}`}>EN</button>
                <span className="text-stone-300">|</span>
                <button onClick={() => setLang('cn')} className={`hover:text-nobel-gold transition-colors ${lang === 'cn' ? 'text-nobel-gold' : 'text-stone-400'}`}>CN</button>
            </div>

            <a href="#services" onClick={scrollToSection('services')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-xs tracking-widest">{t.nav.services}</a>
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-xs tracking-widest">{t.nav.about}</a>
            <a href="#reviews" onClick={scrollToSection('reviews')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-xs tracking-widest">{t.nav.reviews}</a>
            <a 
              href="#book" 
              onClick={scrollToSection('book')}
              className="px-6 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer text-xs tracking-widest uppercase"
            >
              {t.nav.book}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className="flex gap-2 text-xs font-bold">
                <button onClick={() => setLang('th')} className={`${lang === 'th' ? 'text-nobel-gold' : 'text-stone-400'}`}>TH</button>
                <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-nobel-gold' : 'text-stone-400'}`}>EN</button>
                <button onClick={() => setLang('cn')} className={`${lang === 'cn' ? 'text-nobel-gold' : 'text-stone-400'}`}>CN</button>
            </div>
            <button className="text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FDFAF5] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#services" onClick={scrollToSection('services')} className="hover:text-nobel-gold">{t.nav.services}</a>
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold">{t.nav.about}</a>
            <a href="#book" onClick={scrollToSection('book')} className="hover:text-nobel-gold">{t.nav.book}</a>
            <div className="flex gap-4 mt-4">
                <Facebook size={24} className="text-stone-400 hover:text-nobel-gold" />
                <Instagram size={24} className="text-stone-400 hover:text-nobel-gold" />
            </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1 border border-nobel-gold/50 text-nobel-gold text-xs tracking-[0.3em] uppercase font-bold rounded-full bg-white/50 backdrop-blur-sm">
            {t.hero.badge}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 mb-6 drop-shadow-sm leading-tight">
            {t.hero.title} <br/><span className="italic text-stone-500">{t.hero.subtitle}</span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-stone-600 font-light leading-relaxed mb-10">
            {t.hero.desc}
          </p>
          
          <div className="flex justify-center gap-4">
             <a href="#book" onClick={scrollToSection('book')} className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl text-sm tracking-widest uppercase">
                {t.hero.btn_book}
             </a>
             <a href="#services" onClick={scrollToSection('services')} className="px-8 py-3 bg-white text-stone-900 border border-stone-200 rounded-full hover:bg-stone-50 transition-all shadow-sm hover:shadow-md text-sm tracking-widest uppercase">
                {t.hero.btn_services}
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction / Services Preview */}
        <section id="services" className="py-24 bg-white relative">
           <div className="container mx-auto px-6">
               <div className="text-center max-w-2xl mx-auto mb-16">
                   <h2 className="font-serif text-4xl text-stone-900 mb-4">{t.services.title}</h2>
                   <div className="w-12 h-0.5 bg-nobel-gold mx-auto mb-6"></div>
                   <p className="text-stone-500">{t.services.desc}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {t.services.items.map((item, idx) => (
                      <ServiceHighlight 
                        key={idx}
                        title={item.title} 
                        price={item.price}
                        desc={item.desc}
                      />
                  ))}
               </div>
           </div>
        </section>

        {/* Booking Section */}
        <section id="book" className="py-24 bg-[#FDFAF5] border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-serif text-4xl text-stone-900 mb-6">{t.book.title}</h2>
                            <p className="text-stone-600 mb-8 leading-relaxed">
                                {t.book.desc}
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 text-stone-600">
                                    <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-nobel-gold shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-900 text-sm">{t.book.location}</p>
                                        <p className="text-sm leading-relaxed">{t.book.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-stone-600">
                                    <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-nobel-gold shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-900 text-sm">{t.book.contact}</p>
                                        <p className="text-sm">{t.book.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <BookingSystem lang={lang} />
                    </div>
                </div>
            </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">{t.reviews.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.reviews.items.map((item, idx) => (
                        <ReviewCard key={idx} name={item.name} text={item.text} />
                    ))}
                </div>
            </div>
        </section>

        {/* About / Footer */}
        <section id="about" className="bg-stone-900 text-stone-300 py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="font-serif text-2xl text-white mb-6">Schon Blink Salon</h3>
                        <p className="text-stone-400 leading-relaxed mb-6 max-w-md">
                            {t.footer.about}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/SchonBlinkSalon/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-nobel-gold hover:text-stone-900 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-nobel-gold hover:text-stone-900 transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest mb-4">{t.footer.hours_title}</h4>
                            <ul className="space-y-2 text-stone-400">
                                {t.footer.hours.map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                        </div>
                        <div>
                             <h4 className="text-white font-bold uppercase tracking-widest mb-4">{t.footer.menu_title}</h4>
                             <ul className="space-y-2">
                                <li><a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a></li>
                                <li><a href="#book" className="hover:text-white transition-colors">{t.nav.book}</a></li>
                                <li><a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a></li>
                             </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs text-stone-600">
                    {t.footer.rights}
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};

export default App;
