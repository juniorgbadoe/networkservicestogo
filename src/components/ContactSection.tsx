import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Input, Textarea } from './Input';
import { Button } from './Button';
import { Card } from './Card';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Merci pour votre message ! Nous vous recontacterons très prochainement.');
    setFormData({ name: '', email: '', phone: '', message: '' });
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
      value: 'contact@digitalpro.fr',
      link: 'mailto:contact@digitalpro.fr'
    },
    {
      icon: <Phone size={24} />,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Adresse',
      value: '123 Avenue des Champs-Élysées, 75008 Paris',
      link: null
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, label: 'LinkedIn', url: '#' },
    { icon: <Twitter size={20} />, label: 'Twitter', url: '#' },
    { icon: <Facebook size={20} />, label: 'Facebook', url: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', url: '#' }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-[var(--gray-50)] to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
            Contactez-Nous
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Prêt à démarrer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
              votre projet ?
            </span>
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Parlez-nous de votre vision et découvrez comment nous pouvons vous aider à la concrétiser.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    label="Nom complet"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="votre@email.fr"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Input
                  name="phone"
                  type="tel"
                  label="Téléphone"
                  placeholder="+33 1 23 45 67 89"
                  value={formData.phone}
                  onChange={handleChange}
                />
                
                <Textarea
                  name="message"
                  label="Message"
                  placeholder="Décrivez votre projet..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                />
                
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full md:w-auto"
                  icon={<Send size={20} />}
                >
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} variant="bordered">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] flex items-center justify-center text-white flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-[var(--secondary)] mb-1">{info.title}</p>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-[var(--gray-600)] hover:text-[var(--primary)] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[var(--gray-600)]">{info.value}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Links */}
            <Card variant="bordered">
              <h3 className="font-bold text-[var(--secondary)] mb-4">Suivez-nous</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg border-2 border-[var(--gray-300)] text-[var(--gray-600)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 flex items-center justify-center transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </Card>

            {/* Quick Response */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] rounded-xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Réponse rapide garantie</h3>
              <p className="text-sm opacity-90">
                Nous nous engageons à vous répondre dans les 24 heures ouvrées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
