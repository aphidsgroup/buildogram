import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Projects OS | Buildogram Ops",
};

export const dynamic = "force-dynamic";

export default async function OpsProjectsPage({ searchParams }) {
  const { status, type } = searchParams;

  const where = {};
  if (status) where.status = status;
  if (type) where.project_type = type;

  const projects = await prisma.projects.findMany({
    where,
    orderBy: { created_at: "desc" },
    include: {
      partners: { select: { company_name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Delivery OS</h1>
          <p className="text-sm text-gray-500">Manage all construction and service projects.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/ops/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            + New Project
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 flex gap-4 overflow-x-auto">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <Link href="/ops/projects" className={`px-3 py-1 rounded-full text-sm ${!status ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>All</Link>
          <Link href="?status=enquiry" className={`px-3 py-1 rounded-full text-sm ${status === 'enquiry' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>Enquiry</Link>
          <Link href="?status=active" className={`px-3 py-1 rounded-full text-sm ${status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>Active</Link>
          <Link href="?status=completed" className={`px-3 py-1 rounded-full text-sm ${status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>Completed</Link>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Type:</span>
          <Link href={`?status=${status || ''}`} className={`px-3 py-1 rounded-full text-sm ${!type ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>All</Link>
          <Link href={`?status=${status || ''}&type=home_construction`} className={`px-3 py-1 rounded-full text-sm ${type === 'home_construction' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>Home</Link>
          <Link href={`?status=${status || ''}&type=structural_audit`} className={`px-3 py-1 rounded-full text-sm ${type === 'structural_audit' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>Audit</Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={`/ops/projects/${project.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {project.project_code || "Draft"} - {project.name}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {project.project_type?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${project.status === 'active' ? 'bg-green-100 text-green-800' : 
                          project.status === 'enquiry' ? 'bg-yellow-100 text-yellow-800' : 
                          project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {project.status?.toUpperCase() || "ENQUIRY"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:space-x-6">
                      <p className="flex items-center text-sm text-gray-500">
                        Client: {project.client_name || "Unknown"}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        Partner: {project.partners?.company_name || "None"}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Created {format(new Date(project.created_at), "MMM d, yyyy")}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No projects found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
