import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UploadDocument = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [docType, setDocType] = useState('NATIONAL_ID');
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [citizenId, setCitizenId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const findOrCreateCitizen = async () => {
            try {
                const res = await api.get('/citizens');
                const citizens = res.data?.data || [];
                if (citizens.length > 0) {
                    setCitizenId(citizens[0].id);
                    return;
                }
                const createRes = await api.post('/citizens', {
                    firstName: user?.firstName || 'Citizen',
                    lastName: user?.lastName || 'User',
                    email: user?.email || '',
                    dateOfBirth: '1990-01-01'
                });
                setCitizenId(createRes.data?.data?.id);
            } catch (err) {
                console.error('Failed to find/create citizen:', err);
            }
        };
        if (user) findOrCreateCitizen();
    }, [user]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(selectedFile.type)) {
            setError('Please upload a valid image (JPEG, PNG) or PDF.');
            return;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File size exceeds 5MB limit.');
            return;
        }
        setError('');
        setFile(selectedFile);
    };

    const removeFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async () => {
        if (!file || !citizenId) return;
        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('documentType', docType);
        formData.append('documentNumber', '63-1234567A00');

        try {
            await api.post(`/documents/citizen/${citizenId}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/verify/status');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to upload document.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-primary">Upload Document</h1>
                <p className="text-textDark/70 mt-1">Provide an official government ID for verification.</p>
            </div>
            <Card>
                <CardContent className="pt-6 space-y-6">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-100/90 rounded-md border border-red-200">{error}</div>
                    )}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-textDark">Document Type</label>
                        <select
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                            className="flex h-10 w-full rounded-lg border border-secondary/20 bg-surface px-3 py-2 text-sm"
                        >
                            <option value="NATIONAL_ID">Zimbabwe National ID</option>
                            <option value="PASSPORT">Passport</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-textDark">Upload File</label>
                        {!file ? (
                            <div
                                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragging ? 'border-accent bg-accent/5' : 'border-secondary/20 hover:border-secondary/50'}`}
                            >
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
                                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                                    <UploadCloud className="h-6 w-6 text-secondary" />
                                </div>
                                <h4 className="font-medium text-textDark mb-1">Click to upload or drag and drop</h4>
                                <p className="text-sm text-textDark/50">PNG, JPG or PDF (max. 5MB)</p>
                            </div>
                        ) : (
                            <div className="border border-success/30 bg-success/5 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mr-3">
                                        <File className="h-5 w-5 text-success" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-textDark truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-textDark/60">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button onClick={removeFile} className="p-1.5 text-textDark/50 hover:text-red-500 rounded-md">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="bg-background/50 border-t border-secondary/10 px-6 py-4 flex justify-end">
                    <Button variant="primary" disabled={!file || uploading || !citizenId} onClick={handleSubmit} className="w-full sm:w-auto">
                        {uploading ? 'Uploading...' : 'Submit for Verification'}
                    </Button>
                </CardFooter>
            </Card>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-800">Ensure all edges of the document are visible and the text is clear.</p>
            </div>
        </div>
    );
};