export declare class SocietyAuditLog {
    audit_id: string;
    table_name: string;
    record_id: string;
    action_type: 'CREATE' | 'UPDATE' | 'DELETE';
    old_data: any;
    new_data: any;
    changed_by: string | null;
    changed_at: Date;
    ip_address: string | null;
    platform: string | null;
}
