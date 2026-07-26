import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';
import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Cement | Buildogram",
  description: "Explore cement material options and request current quotations, specifications and supplier documentation through Buildogram.",
  path: "/materials/cement"
});




export default function CementPage() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Material Sourcing Hub"
      heroTitle="Cement Supply in Chennai"
      heroSub="Request current quotations for OPC 53 and PPC cement. Check batch age, grade, bag condition and supplier documentation before acceptance."
      heroPrimaryCta={{ label: 'Get a Cement Quote', href: '/contact?type=materials' }}
      heroSecondaryCta={{ label: 'View All Materials', href: '/materials' }}
      
      problems={[
        { icon: "📅", title: "Expired Stock", desc: "Cement loses about 20% of its strength after 3 months. Many suppliers push older stock that causes weak concrete." },
        { icon: "⚖️", title: "Underweight Bags", desc: "Standard bags should weigh exactly 50kg. Adulteration or spillage in transit can shortchange your material budget." },
        { icon: "❌", title: "Wrong Grade Usage", desc: "Using PPC where OPC 53 is required (like roof slabs) delays setting time and compromises immediate structural load capacity." }
      ]}
      
      processSteps={[
        { step: "01", title: "Requirement Analysis", desc: "We calculate your exact bag requirement based on your floor plan or BOQ to prevent over-ordering." },
        { step: "02", title: "Supplier Options", desc: "Compare current quotations from supplier options serving your Chennai zone, including stated transport costs." },
        { step: "03", title: "Brand & Grade Selection", desc: "Our engineers recommend the right mix—OPC 53 for structural members and PPC for plastering/brickwork." },
        { step: "04", title: "Delivery & Verification", desc: "We physically or digitally verify the 'Week of Manufacturing' printed on the bags upon delivery." }
      ]}
      
      serviceDetails={[
        { title: "OPC 53 Grade", desc: "High early strength cement ideal for RCC work, slabs, columns, and beams. We ensure it's factory-fresh for maximum strength." },
        { title: "PPC (Portland Pozzolana Cement)", desc: "Best for brick masonry, plastering, and tiling. Highly resistant to chemical attacks, making it great for Chennai's coastal weather." },
        { title: "Top Brands Available", desc: "We facilitate sourcing from UltraTech, Ramco, Dalmia, Chettinad, Zuari, and Coromandel based on current market availability." },
        { title: "Bulk & Retail Procurement", desc: "Whether you need 50 bags for a renovation or 5000 bags for a commercial project, we negotiate the best per-bag rate." }
      ]}
      
      proofData={{
        title: "The Buildogram Verification Protocol",
        desc: "We don't just order cement; we engineer its procurement.",
        dashboardTitle: "On-Site Quality Checks",
        items: [
          "Week & Year of Manufacturing validation",
          "Visual inspection for moisture lumps",
          "Temperature check (should feel cool to touch)",
          "Float test sample verification",
          "ISI Mark & Grade confirmation"
        ]
      }}
      
      faqs={[
        { q: "What is the current price of cement in Chennai?", a: "Prices fluctuate daily based on brand and grade (usually between ₹350 to ₹420 per bag). Contact us for today's indicative rate." },
        { q: "Why should I use OPC 53 for roof slabs?", a: "OPC 53 achieves higher strength faster than PPC. It's crucial for load-bearing structures where you need to remove formwork (shuttering) within the standard timeline." },
        { q: "How do you check the manufacturing date?", a: "Every cement bag has a printed code indicating the Week, Month, and Year of packing. Our engineers train your site supervisor to read this, or we verify it for you." },
        { q: "What should I do if cement arrives with lumps?", a: "Do not use moisture-affected or lumpy cement. Photograph the delivery, isolate the bags and raise the issue under the supplier's written replacement terms." }
      ]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Buy Cement in Chennai","path":"/materials/cement"}]} />
    </>
  );
}
