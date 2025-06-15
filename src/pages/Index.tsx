
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Code, FileCode, Play, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Web IDE
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A clean and user-friendly online HTML, CSS, and JavaScript editor. 
            Perfect for beginners who want to see their code come to life instantly.
          </p>
          <Link to="/ide">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Start Coding
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Single File Mode</h3>
            <p className="text-gray-300">
              Write HTML, CSS, and JavaScript all in one file. Perfect for quick prototypes and simple projects.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Split Files</h3>
            <p className="text-gray-300">
              Organize your code into separate HTML, CSS, and JavaScript files for better structure and readability.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Live Preview</h3>
            <p className="text-gray-300">
              See your changes instantly in the live preview panel. No need to refresh or switch tabs.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Syntax Highlighting</h3>
            <p className="text-gray-300">
              Clean, color-coded syntax highlighting makes your code easy to read and understand.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Download Projects</h3>
            <p className="text-gray-300">
              Export your projects as HTML files that you can run locally or upload to any web server.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Beginner Friendly</h3>
            <p className="text-gray-300">
              Designed with beginners in mind. Clean interface, helpful examples, and instant feedback.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Coding?
            </h2>
            <p className="text-blue-100 mb-6">
              Jump right in and start building your first web project. No setup required!
            </p>
            <Link to="/ide">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Launch IDE
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
