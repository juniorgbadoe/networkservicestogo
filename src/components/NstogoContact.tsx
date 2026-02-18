import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Linkedin, Twitter, Facebook, Instagram, CheckCircle } from 'lucide-react';
import { Input, Textarea } from './Input';
import { Button } from './Button';

export function NstogoContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setSubmitted(false);
    }, 3000);
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
      value: 'contact@nstogo.com',
      link: 'mailto:contact@nstogo.com',
      color: 'from-[var(--primary)] to-[var(--primary-light)]'
    },
    {
      icon: <Phone size={24} />,
      title: 'Téléphone',
      value: '+228 79 71 00 22 / +228 91 54 14 48',
      link: 'tel:0022879710022',
      color: 'from-[var(--accent-turquoise)] to-[#00A0A0]'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Adresse',
      value: '',
      link: null,
      color: 'from-[var(--accent-gold)] to-[#FF8C00]'
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, label: 'LinkedIn', url: '#' },
    { icon: <Twitter size={20} />, label: 'Twitter', url: '#' },
    { icon: <Facebook size={20} />, label: 'Facebook', url: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', url: '#' }
  ];

  const features = [
    { icon: <MessageCircle size={20} />, text: 'Réponse sous 24h' },
    { icon: <Clock size={20} />, text: 'Devis gratuit' },
    { icon: <CheckCircle size={20} />, text: 'Sans engagement' }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Contactez-Nous
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)]">
            Démarrons votre projet
            <span className="block gradient-text mt-2">
              ensemble
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed">
            Une idée, un projet, une question ? Notre équipe d'experts est à votre écoute pour transformer votre vision en réalité.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[var(--gray-200)]">
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
                      <div key={idx} className="flex items-center gap-2 text-[var(--gray-600)]">
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
                  >
                    Envoyer ma demande
                  </Button>
                </form>
              ) : (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent-turquoise)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--secondary)] mb-4">
                    Message envoyé !
                  </h3>
                  <p className="text-lg text-[var(--gray-600)]">
                    Merci pour votre intérêt. Notre équipe vous recontactera dans les 24 heures.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--gray-200)] hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    {info.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-[var(--secondary)] mb-2">{info.title}</p>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-[var(--gray-600)] hover:text-[var(--primary)] transition-colors break-words text-sm"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[var(--gray-600)] text-sm leading-relaxed">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            {/*<div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>*/}

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-[var(--accent-gold)] to-[#FF8C00] rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold text-lg mb-2">Besoin urgent ?</h3>
              <p className="text-sm mb-4 text-white/90">
                Notre équipe est disponible 24/7 pour les urgences
              </p>
              <a 
                href="tel:+33176543210"
                className="inline-flex items-center gap-2 bg-white text-[var(--secondary)] px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow"
              >
                <Phone size={18} />
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}