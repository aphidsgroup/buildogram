import PublicServicePage from '@/components/ui/PublicServicePage';
import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';

export const metadata = generateSEOMetadata({
  title: 'TMT Steel Bars for Construction in Chennai | Fe500D & Fe550D',
  description: 'Source primary TMT steel brands like Tata Tiscon, JSW, and VSP in Chennai. Engineer-verified Fe500D and Fe550D grades with MTC (Material Test Certificates).',
  path: '/materials/tmt-steel',
});

export default function TmtSteelPage() {
  return (
    <PublicServicePage
      heroEyebrow="Material Sourcing Hub"
      heroTitle="Engineer-Verified TMT Steel in Chennai"
      heroSub="Secure primary-brand Fe500D and Fe550D TMT steel bars directly from authorized distributors. Every delivery includes an MTC (Material Test Certificate) and physical bendability checks by our engineers."
      heroPrimaryCta={{ label: 'Get a Steel Quote', href: '/contact?type=materials' }}
      heroSecondaryCta={{ label: 'View All Materials', href: '/materials' }}
      
      problems={[
        { icon: "📉", title: "Secondary/Local Brands", desc: "Using cheaper, secondary steel brands compromises earthquake resistance due to poor ductility and inconsistent rib patterns." },
        { icon: "⚖️", title: "Weight Shortages", desc: "Unscrupulous dealers manipulate weighbridge tickets or supply undersized diameter bars, leading to hidden financial losses." },
        { icon: "锈", title: "Rusted Deliveries", desc: "Chennai's coastal humidity causes rapid corrosion. Accepting heavily rusted steel impacts the bonding strength with concrete." }
      ]}
      
      processSteps={[
        { step: "01", title: "BOQ & Bar Bending Schedule", desc: "Our engineers review your structural drawings to extract exact diameter-wise requirements (8mm, 10mm, 16mm, etc.)." },
        { step: "02", title: "Brand & Grade Match", desc: "We recommend Fe500D or Fe550D primary brands like Tata Tiscon, JSW Neosteel, or SAIL based on your budget and structural load." },
        { step: "03", title: "Transparent Quotation", desc: "You receive a clear per-ton or per-kg price that includes loading, transit, and weighbridge charges." },
        { step: "04", title: "Weighbridge Verification", desc: "We track the physical weighbridge slip and verify the gauge and brand embossment on delivery." }
      ]}
      
      serviceDetails={[
        { title: "Primary TMT Brands", desc: "We only partner with primary steel manufacturers (Tata, JSW, RINL/VSP, SAIL, Jindal Panther) that manufacture steel directly from iron ore." },
        { title: "Fe500D & Fe550D Grades", desc: "The 'D' stands for Ductility. These grades offer superior elongation, making your home highly resistant to seismic activity." },
        { title: "MTC Verification", desc: "Every batch comes with a Material Test Certificate from the manufacturer proving the chemical composition (carbon, sulfur, phosphorus)." },
        { title: "Diameter-Wise Matching", desc: "We ensure you get the exact mix of 8mm, 10mm, 12mm, 16mm, 20mm, and 25mm rods as specified by your structural engineer." }
      ]}
      
      proofData={{
        title: "The Buildogram Verification Protocol",
        desc: "We ensure the skeleton of your building is uncompromised.",
        dashboardTitle: "Steel Quality Checks",
        items: [
          "Rolling mark & brand embossment check",
          "Sectional weight verification per meter",
          "Bend and re-bend testing",
          "Rust level and surface condition inspection",
          "MTC (Material Test Certificate) logging"
        ]
      }}
      
      faqs={[
        { q: "What is the difference between Primary and Secondary steel?", a: "Primary steel (like Tata or JSW) is made directly from iron ore, ensuring perfect chemical composition and strength. Secondary steel is melted down from scrap, leading to impurities and lower ductility." },
        { q: "What does Fe500D mean?", a: "Fe stands for Iron. 500 is the yield strength in N/mm². 'D' stands for ductility, meaning it can bend under extreme stress (like an earthquake) without snapping." },
        { q: "How do you prevent under-weighing?", a: "We insist on computerized weighbridge slips from verified third-party scales and randomly sample bundle weights on-site to ensure the sectional weight matches ISI standards." },
        { q: "Is surface rust on TMT bars bad?", a: "A light yellowish/brown surface rust is normal and actually helps bond with concrete. However, if the rust is scaling off or pitting the metal, the bar has degraded and should be rejected." }
      ]}
    />
  );
}
