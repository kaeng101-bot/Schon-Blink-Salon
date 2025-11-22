
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Clock, Scissors, User, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  category: 'hair' | 'treatment' | 'nails';
}

type Language = 'th' | 'en' | 'cn';

interface BookingSystemProps {
    lang: Language;
}

const getServices = (lang: Language): Service[] => {
    switch (lang) {
        case 'th':
            return [
                { id: '1', name: 'ตัดผมและจัดทรง', price: '฿500', duration: '60 นาที', category: 'hair' },
                { id: '2', name: 'ทำสีผม', price: '฿2,500', duration: '120 นาที', category: 'hair' },
                { id: '3', name: 'เคราตินทรีทเมนท์', price: '฿3,000', duration: '90 นาที', category: 'treatment' },
                { id: '4', name: 'ทำเล็บเจล', price: '฿800', duration: '45 นาที', category: 'nails' },
                { id: '5', name: 'ดัดดิจิตอล', price: '฿3,500', duration: '150 นาที', category: 'hair' },
                { id: '6', name: 'สปาดีท็อกซ์หนังศีรษะ', price: '฿1,200', duration: '60 นาที', category: 'treatment' },
            ];
        case 'cn':
             return [
                { id: '1', name: '剪发与造型', price: '฿500', duration: '60 分钟', category: 'hair' },
                { id: '2', name: '全染', price: '฿2,500', duration: '120 分钟', category: 'hair' },
                { id: '3', name: '角蛋白护理', price: '฿3,000', duration: '90 分钟', category: 'treatment' },
                { id: '4', name: '凝胶美甲', price: '฿800', duration: '45 分钟', category: 'nails' },
                { id: '5', name: '数码烫', price: '฿3,500', duration: '150 分钟', category: 'hair' },
                { id: '6', name: '头皮排毒水疗', price: '฿1,200', duration: '60 分钟', category: 'treatment' },
            ];
        default:
            return [
                { id: '1', name: 'Signature Haircut & Style', price: '฿500', duration: '60 min', category: 'hair' },
                { id: '2', name: 'Full Hair Coloring', price: '฿2,500', duration: '120 min', category: 'hair' },
                { id: '3', name: 'Keratin Treatment', price: '฿3,000', duration: '90 min', category: 'treatment' },
                { id: '4', name: 'Gel Manicure', price: '฿800', duration: '45 min', category: 'nails' },
                { id: '5', name: 'Digital Perm', price: '฿3,500', duration: '150 min', category: 'hair' },
                { id: '6', name: 'Scalp Detox Spa', price: '฿1,200', duration: '60 min', category: 'treatment' },
            ];
    }
}

const getUI = (lang: Language) => {
    const dict = {
        en: {
            steps: ['Service', 'Time', 'Details', 'Done'],
            step1_title: "Choose Your Service",
            step1_select: "Select",
            step2_back: "Back",
            step2_title: "Select Date & Time",
            step2_sub: "For",
            step2_label_date: "1. Select Date",
            step2_label_time: "2. Select Time",
            step2_next: "Continue",
            step3_back: "Back",
            step3_title: "Your Details",
            step3_name: "Full Name",
            step3_name_ph: "Enter your name",
            step3_phone: "Phone Number",
            step3_phone_ph: "064-079-6464",
            step3_btn: "Confirm Booking",
            step4_title: "Booking Confirmed!",
            step4_desc: (name: string, service: string, date: string, time: string) => `Thank you, ${name}. We have reserved your appointment for ${service} on ${date} at ${time}.`,
            step4_location: "We'll see you at",
            step4_btn: "Book Another Appointment"
        },
        th: {
            steps: ['บริการ', 'เวลา', 'ข้อมูล', 'เสร็จสิ้น'],
            step1_title: "เลือกบริการ",
            step1_select: "เลือก",
            step2_back: "ย้อนกลับ",
            step2_title: "เลือกวันและเวลา",
            step2_sub: "สำหรับ",
            step2_label_date: "1. เลือกวันที่",
            step2_label_time: "2. เลือกเวลา",
            step2_next: "ดำเนินการต่อ",
            step3_back: "ย้อนกลับ",
            step3_title: "ข้อมูลของคุณ",
            step3_name: "ชื่อ-นามสกุล",
            step3_name_ph: "กรอกชื่อของคุณ",
            step3_phone: "เบอร์โทรศัพท์",
            step3_phone_ph: "064-079-6464",
            step3_btn: "ยืนยันการจอง",
            step4_title: "การจองสำเร็จ!",
            step4_desc: (name: string, service: string, date: string, time: string) => `ขอบคุณค่ะ คุณ ${name} เราได้จองคิวบริการ ${service} วันที่ ${date} เวลา ${time} เรียบร้อยแล้ว`,
            step4_location: "เจอกันที่",
            step4_btn: "จองคิวเพิ่ม"
        },
        cn: {
            steps: ['服务', '时间', '详情', '完成'],
            step1_title: "选择服务",
            step1_select: "选择",
            step2_back: "返回",
            step2_title: "选择日期和时间",
            step2_sub: "对于",
            step2_label_date: "1. 选择日期",
            step2_label_time: "2. 选择时间",
            step2_next: "继续",
            step3_back: "返回",
            step3_title: "您的详细信息",
            step3_name: "全名",
            step3_name_ph: "输入您的姓名",
            step3_phone: "电话号码",
            step3_phone_ph: "064-079-6464",
            step3_btn: "确认预订",
            step4_title: "预订已确认！",
            step4_desc: (name: string, service: string, date: string, time: string) => `谢谢，${name}。我们已为您预订了 ${date} ${time} 的 ${service} 服务。`,
            step4_location: "地点",
            step4_btn: "预订另一个预约"
        }
    }
    return dict[lang];
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ lang }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [details, setDetails] = useState({ name: '', phone: '' });
  
  // Reset step when lang changes if needed, or just let text update. 
  // Text update is safer.
  
  const ui = getUI(lang);
  const services = getServices(lang);

  const timeSlots = ['10:00', '11:00', '13:00', '14:30', '16:00', '17:30'];

  // Generate next 7 days for demo
  const dates = Array.from({length: 5}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      return {
          day: d.toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'cn' ? 'zh-CN' : 'en-US', { weekday: 'short' }),
          date: d.getDate(),
          full: d.toISOString().split('T')[0],
          displayDate: d.toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'cn' ? 'zh-CN' : 'en-US', { month: 'long', day: 'numeric' })
      }
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      nextStep();
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 min-h-[600px] flex flex-col">
      
      {/* Progress Header */}
      <div className="bg-nobel-rose/10 p-6 border-b border-nobel-rose/20">
         <div className="flex justify-between items-center max-w-xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -z-10"></div>
            {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-nobel-gold text-white' : 'bg-white text-stone-400 border border-stone-200'}`}>
                    {step > s ? <Check size={14} /> : s}
                </div>
            ))}
         </div>
         <div className="flex justify-between max-w-xl mx-auto mt-2 text-xs font-medium text-stone-500 uppercase tracking-wider">
             {ui.steps.map((s, i) => <span key={i}>{s}</span>)}
         </div>
      </div>

      <div className="flex-1 p-6 md:p-8 relative">
        <AnimatePresence mode="wait">
            
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                >
                    <h2 className="text-2xl font-serif text-stone-800 mb-6 text-center">{ui.step1_title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map(service => (
                            <div 
                                key={service.id}
                                onClick={() => { setSelectedService(service); nextStep(); }}
                                className="group p-4 rounded-xl border border-stone-200 hover:border-nobel-gold cursor-pointer transition-all hover:shadow-md flex justify-between items-center bg-[#FDFAF5]/50"
                            >
                                <div>
                                    <h3 className="font-medium text-stone-800 group-hover:text-nobel-gold transition-colors">{service.name}</h3>
                                    <p className="text-sm text-stone-500 mt-1 flex items-center gap-2">
                                        <Clock size={12} /> {service.duration}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-serif text-lg text-stone-900">{service.price}</span>
                                    <span className="text-xs text-nobel-gold uppercase tracking-wider font-bold">{ui.step1_select}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                >
                    <div className="mb-8">
                        <button onClick={prevStep} className="text-sm text-stone-500 flex items-center gap-1 hover:text-stone-800 mb-4"><ChevronLeft size={14} /> {ui.step2_back}</button>
                        <h2 className="text-2xl font-serif text-stone-800 text-center">{ui.step2_title}</h2>
                        <p className="text-center text-stone-500 mt-2">{ui.step2_sub} {selectedService?.name}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">{ui.step2_label_date}</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {dates.map((d) => (
                                    <button
                                        key={d.full}
                                        onClick={() => setDate(d.full)}
                                        className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${date === d.full ? 'bg-stone-800 text-white border-stone-800' : 'border-stone-200 hover:border-nobel-gold'}`}
                                    >
                                        <span className="text-xs opacity-60 uppercase">{d.day}</span>
                                        <span className="text-xl font-serif">{d.date}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                             <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">{ui.step2_label_time}</h3>
                             <div className="grid grid-cols-3 gap-3">
                                 {timeSlots.map((t) => (
                                     <button
                                        key={t}
                                        disabled={!date}
                                        onClick={() => setTime(t)}
                                        className={`py-2 px-4 rounded-lg border text-sm transition-all ${time === t ? 'bg-nobel-gold text-white border-nobel-gold' : 'border-stone-200 text-stone-600 hover:border-stone-400'} ${!date ? 'opacity-50 cursor-not-allowed' : ''}`}
                                     >
                                         {t}
                                     </button>
                                 ))}
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-8 flex justify-end">
                        <button 
                            disabled={!date || !time}
                            onClick={nextStep}
                            className={`px-8 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${date && time ? 'bg-stone-900 text-white shadow-lg hover:bg-stone-800' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                        >
                            {ui.step2_next} <ArrowRight size={16} />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
                <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <button onClick={prevStep} className="text-sm text-stone-500 flex items-center gap-1 hover:text-stone-800 mb-4"><ChevronLeft size={14} /> {ui.step3_back}</button>
                    <h2 className="text-2xl font-serif text-stone-800 mb-6 text-center">{ui.step3_title}</h2>
                    
                    <div className="max-w-md mx-auto">
                        <div className="bg-stone-50 p-4 rounded-xl mb-6 border border-stone-100 flex gap-4 items-start">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-stone-200 text-nobel-gold shrink-0">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h4 className="font-serif font-medium text-stone-900">{selectedService?.name}</h4>
                                <p className="text-sm text-stone-500 mt-1">
                                    {new Date(date).toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'cn' ? 'zh-CN' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })} @ {time}
                                </p>
                                <p className="text-sm font-medium text-nobel-gold mt-1">{selectedService?.price}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">{ui.step3_name}</label>
                                <input 
                                    required
                                    type="text" 
                                    value={details.name}
                                    onChange={e => setDetails({...details, name: e.target.value})}
                                    className="w-full p-3 rounded-lg border border-stone-200 focus:border-nobel-gold focus:ring-1 focus:ring-nobel-gold outline-none transition-all"
                                    placeholder={ui.step3_name_ph}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">{ui.step3_phone}</label>
                                <input 
                                    required
                                    type="tel" 
                                    value={details.phone}
                                    onChange={e => setDetails({...details, phone: e.target.value})}
                                    className="w-full p-3 rounded-lg border border-stone-200 focus:border-nobel-gold focus:ring-1 focus:ring-nobel-gold outline-none transition-all"
                                    placeholder={ui.step3_phone_ph}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-4 bg-stone-900 text-white rounded-full mt-4 font-medium shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                            >
                                {ui.step3_btn}
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
                <motion.div 
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-3xl font-serif text-stone-900 mb-2">{ui.step4_title}</h2>
                    <p className="text-stone-500 max-w-xs mx-auto mb-8">
                        {ui.step4_desc(details.name, selectedService?.name || '', new Date(date).toLocaleDateString(), time)}
                    </p>
                    
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 w-full max-w-sm mb-8">
                        <p className="text-sm text-stone-500">{ui.step4_location}</p>
                        <p className="font-medium text-stone-900">Schon Blink Salon</p>
                    </div>

                    <button 
                        onClick={() => {
                            setStep(1);
                            setDate('');
                            setTime('');
                            setDetails({name: '', phone: ''});
                            setSelectedService(null);
                        }}
                        className="px-6 py-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        {ui.step4_btn}
                    </button>
                </motion.div>
            )}

        </AnimatePresence>
      </div>
    </div>
  );
};

// --- SURFACE CODE / TRANSFORMER / PERFORMANCE ---
export const SurfaceCodeDiagram: React.FC = () => null;
export const TransformerDecoderDiagram: React.FC = () => null;
export const PerformanceMetricDiagram: React.FC = () => null;
