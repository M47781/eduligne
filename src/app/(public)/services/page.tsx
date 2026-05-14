import Image from 'next/image';
import { BookOpen, Library, Cpu, Bot, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export default function Services() {
  const services = [
    {
      icon: BookOpen,
      title: 'الدورات التعليمية',
      description: 'مجموعة واسعة من الدورات في مختلف المجالات، مصممة بعناية لتناسب جميع المستويات.',
      link: '/courses',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Library,
      title: 'المكتبة الرقمية',
      description: 'آلاف الكتب والمراجع والمقالات العلمية المتاحة للتحميل والقراءة المباشرة.',
      link: '/library',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Cpu,
      title: 'مشاريع STEM',
      description: 'تطبيقات عملية ومشاريع مبتكرة في مجالات العلوم والتكنولوجيا والهندسة والرياضيات.',
      link: '/stem',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Bot,
      title: 'الذكاء الاصطناعي',
      description: 'مساعد ذكي متوفر على مدار الساعة للإجابة على استفساراتك وتلخيص الدروس المعقدة.',
      link: '/ai',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Users,
      title: 'المجتمع التعليمي',
      description: 'تواصل مع زملائك والأساتذة، شارك أفكارك، واطرح أسئلتك في بيئة تفاعلية آمنة.',
      link: '/community',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتنا</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات التعليمية المصممة لتعزيز تجربة التعلم الخاصة بك.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <Image  
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    referrerPolicy="no-referrer"
                  width={500} height={500} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                    <service.icon className="text-primary-600 w-6 h-6 shrink-0" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                    {service.description}
                  </p>
                  <Link href={service.link}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    عرض المزيد
                    <ArrowLeft   className="w-4 h-4 shrink-0"/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
