import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AppsShowcase } from '../components/AppsShowcase';
import { CatalogSection } from '../components/CatalogSection';
import { CompanyProfileSection } from '../components/CompanyProfileSection';
import { PartnerSolutionsSection } from '../components/PartnerSolutionsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AppsShowcase />
      <CatalogSection />
      <CompanyProfileSection />
      <PartnerSolutionsSection />
    </div>
  );
}
