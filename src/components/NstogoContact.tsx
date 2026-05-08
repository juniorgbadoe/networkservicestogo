import React, { useState } from 'react';
import { CheckCircle, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Twitter } from 'lucide-react';
import { Input, Textarea } from './Input';
import { Button } from './Button';
import { useSiteShell } from '../hooks/useSiteContent';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export function NstogoContact() {
  const { settings } = useSiteShell();
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg(null);
    setSending(true);

    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: { ok?: boolean; message?: string } | null = null;
      try {
        data = await res.json();
      } catch {
        throw new Error('Réponse invalide du serveur.');
      }

      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.message || 'Échec de l’envoi. Réessayez plus tard.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Impossible d’envoyer votre message pour le moment.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: settings.contact_email,
      link: settings.contact_email ? `mailto:${settings.contact_email}` : '',
      color: 'from-[var(--primary)] to-[var(--primary-light)]',
    },
    {
      icon: <Phone size={24} />,
      title: 'Téléphone',
      value: [settings.contact_phone1, settings.contact_phone2].filter(Boolean).join(' / '),
      link: settings.contact_phone1 ? `tel:${settings.contact_phone1.replace(/\s+/g, '')}` : '',
      color: 'from-[var(--accent-turquoise)] to-[#00A0A0]',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Adresse',
      value: settings.contact_address,
      link: '',
      color: 'from-[var(--accent-gold)] to-[#FF8C00]',
    }
  ].filter((item) => item.value);

  const socialLinks = [
    { icon: <Linkedin size={20} />, label: 'LinkedIn', url: settings.social_linkedin },
    { icon: <Twitter size={20} />, label: 'Twitter', url: settings.social_twitter },
    { icon: <Facebook size={20} />, label: 'Facebook', url: settings.social_facebook },
    { icon: <Instagram size={20} />, label: 'Instagram', url: settings.social_instagram }
  ].filter((item) => item.url);

  const features = [
    { icon: <MessageCircle size={20} />, text: settings.contact_response_time },
    { icon: <CheckCircle size={20} />, text: settings.contact_offer_label },
  ];

  return (
    <section
      id="contact"
      className="
        section-padding relative overflow-hidden
        bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)]
        dark:bg-gradient-to-br dark:from-[var(--nav-dark-from)] dark:via-[var(--nav-dark-via)] dark:to-[var(--nav-dark-to)]
      "
    >


      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6
            dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]/30">
            <span className="text-sm font-semibold text-[var(--primary)]">
              {settings.contact_badge}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)] dark:text-white">
            {settings.contact_title}
            <span className="block gradient-text mt-2">
              {settings.contact_highlight}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed dark:text-slate-200">
            {settings.contact_description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="
              bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[var(--gray-200)]
              dark:bg-white/[0.20] dark:border-white/10
            ">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      name="name"
                      label="Nom complet"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email professionnel"
                      placeholder="jean@entreprise.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      name="phone"
                      type="tel"
                      label="Téléphone"
                      placeholder="+228 70 00 00 00"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      name="company"
                      label="Entreprise"
                      placeholder="Nom de votre entreprise"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <Textarea
                    name="message"
                    label="Parlez-nous de votre projet"
                    placeholder="Décrivez votre besoin, vos objectifs et vos contraintes..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                  />

                  {/* Features */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[var(--gray-600)] dark:text-slate-300">
                        <div className="text-[var(--primary)]">{feature.icon}</div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    icon={<Send size={20} />}
                    disabled={sending}
                  >
                    {sending ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </Button>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm"
                    >
                      {errorMsg}
                    </div>
                  )}
                </form>
              ) : (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent-turquoise)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--secondary)] mb-4 dark:text-white">
                    Message envoyé !
                  </h3>
                  <p className="text-lg text-[var(--gray-600)] dark:text-slate-200">
                    Merci pour votre intérêt. Notre équipe vous recontactera très vite.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="
                  bg-white rounded-2xl p-6 shadow-lg border border-[var(--gray-200)] hover:shadow-xl transition-shadow
                  dark:bg-white/[0.05] dark:border-white/10
                "
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    {info.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-[var(--secondary)] mb-2 dark:text-white">{info.title}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-[var(--gray-600)] hover:text-[var(--primary)] transition-colors break-words text-sm dark:text-slate-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[var(--gray-600)] text-sm leading-relaxed dark:text-slate-300">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {socialLinks.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--gray-200)] dark:bg-white/[0.05] dark:border-white/10">
                <h3 className="font-bold text-[var(--secondary)] mb-4 dark:text-white">Réseaux sociaux</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-[var(--gray-100)] hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center justify-center dark:bg-white/10 dark:hover:bg-[var(--primary)]"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-[var(--accent-gold)] to-[#FF8C00] rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold text-lg mb-2">{settings.contact_offer_label}</h3>
              <p className="text-sm mb-4 text-white/90">
                {settings.contact_offer_text}
              </p>

              <a
                href={settings.contact_whatsapp}
                className="inline-flex items-center gap-2 bg-white text-[var(--secondary)] px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                {settings.contact_whatsapp_label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
